import { Between, Like, MoreThan } from 'typeorm';
import { Service } from 'typedi';
import { RecentStatus } from './dto/response/recentStatus';
import { DatabaseConnection } from 'src/shared/interfaces/databaseConnection';
import { Outage } from 'src/shared/entities/outage';
import { Comment } from 'src/shared/entities/comment';
import { FastifyRequest } from 'fastify';
import { ReportOutage } from './dto/request/reportOutage';
import { PeriodRequest } from './dto/request/getSpecificPeriodOutages';
import { OutageInfo } from './dto/response/outageInfo';

@Service()
export class StatusService {
  async getStatus(db: DatabaseConnection): Promise<RecentStatus> {
    const ongoingOutages = await Promise.all(
      (
        await db.outage.find({ where: { resolved: false } })
      ).map(async (outage) => ({
        outage,
        comments: await db.comment.find({ where: { outageId: outage.id } }),
      })),
    );

    const presentStatus = (() => {
      const outage = ongoingOutages.filter(
        (v) => v.outage.severity === 'red' || v.outage.severity === 'yellow',
      );
      return outage.length
        ? outage.some((v) => v.outage.severity === 'red')
          ? 'red'
          : 'yellow'
        : 'green';
    })();

    const now = new Date();
    const previousDate = new Date(now.getTime());
    previousDate.setDate(now.getDate() - 29);

    const find = (query: string) =>
      db.outage.find({
        where: {
          related: Like(`%${query}%`),
          createdAt: MoreThan(previousDate),
        },
      });

    const outages = await Promise.all([
      find('Admin API'),
      find('User API'),
      find('File API'),
      find('Admin Site'),
      find('User Site'),
    ]);

    const recentOutages = {
      api: {
        admin: this.dateMapper(outages[0], now),
        user: this.dateMapper(outages[1], now),
        file: this.dateMapper(outages[2], now),
      },
      site: {
        admin: this.dateMapper(outages[3], now),
        user: this.dateMapper(outages[4], now),
      },
    };

    const result: RecentStatus = {
      status: presentStatus,
      current_outage: await Promise.all(
        ongoingOutages.map(async (v) => ({
          title: v.outage.title,
          posts: (
            await db.comment.find({ where: { outageId: v.outage.id } })
          ).map((comment) => ({
            title: comment.title,
            content: comment.content,
            date: comment.createdAt,
          })),
          affected_on: v.outage.related,
          severity: v.outage.severity,
          date: v.outage.createdAt,
        })),
      ),
      apis: {
        user: {
          status: this.statusMapper(ongoingOutages, 'User API'),
          recent: new Array(30)
            .fill(undefined)
            .map(this.dateArrayMapper(now, recentOutages.api.user)),
        },
        admin: {
          status: this.statusMapper(ongoingOutages, 'Admin API'),
          recent: new Array(30)
            .fill(undefined)
            .map(this.dateArrayMapper(now, recentOutages.api.admin)),
        },
        file: {
          status: this.statusMapper(ongoingOutages, 'File API'),
          recent: new Array(30)
            .fill(undefined)
            .map(this.dateArrayMapper(now, recentOutages.api.file)),
        },
      },
      sites: {
        user: {
          status: this.statusMapper(ongoingOutages, 'User Site'),
          recent: new Array(30)
            .fill(undefined)
            .map(this.dateArrayMapper(now, recentOutages.site.user)),
        },
        admin: {
          status: this.statusMapper(ongoingOutages, 'Admin Site'),
          recent: new Array(30)
            .fill(undefined)
            .map(this.dateArrayMapper(now, recentOutages.site.admin)),
        },
      },
    };
    return result;
  }

  async reportOutage(
    req: FastifyRequest<{ Body: ReportOutage }>,
    db: DatabaseConnection,
  ): Promise<boolean> {
    return (
      await db.issueReport.insert({
        title: req.body.title,
        content: req.body.content,
      })
    ).identifiers.length
      ? true
      : false;
  }

  async getSpecificPeriodOutages(
    req: FastifyRequest<{ Querystring: PeriodRequest }>,
    db: DatabaseConnection,
  ): Promise<OutageInfo[]> {
    const outages = await db.outage.find({
      where: {
        createdAt: Between(
          new Date(req.query.year, req.query.month - 1, 1),
          new Date(
            req.query.year,
            req.query.month - 1,
            new Date(req.query.year, req.query.month, 0).getDate(),
          ),
        ),
      },
      relations: ['comments'],
    });

    return outages.map((outage) => ({
      title: outage.title,
      posts: outage.comments.map((comment) => ({
        title: comment.title,
        date: comment.createdAt,
        content: comment.content,
      })),
      affected_on: outage.related,
      severity: outage.severity,
      date: outage.createdAt,
    }));
  }

  private statusMapper(
    ongoingOutages: {
      outage: Outage;
      comments: Comment[];
    }[],
    query: string,
  ) {
    const outage = ongoingOutages.filter((v) =>
      v.outage.related.includes(query),
    );
    return outage.length
      ? outage.some((v) => v.outage.severity === 'red')
        ? 'red'
        : 'yellow'
      : 'green';
  }

  private dateArrayMapper(now: Date, map: Map<number, Outage>) {
    return (v: any, k: number) => {
      const date = new Date(now.getTime());
      date.setDate(now.getDate() - 29 + k);
      date.setHours(0, 0, 0, 0);
      return {
        date,
        status: map.has(29 - k) ? map.get(29 - k)!.severity : 'green',
      };
    };
  }

  private dateMapper(entities: Outage[], now: Date): Map<number, Outage> {
    const result = new Map<number, Outage>();
    entities.forEach((outage) => {
      result.set(
        Math.floor((now.getTime() - outage.createdAt.getTime()) / 86400000),
        outage,
      );
    });
    return result;
  }
}
