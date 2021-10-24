import { Repository } from 'typeorm';
import { Comment } from 'src/shared/entities/comment';
import { IssueReport } from 'src/shared/entities/issueReport';
import { Outage } from 'src/shared/entities/outage';

export interface DatabaseConnection {
  comment: Repository<Comment>;
  issueReport: Repository<IssueReport>;
  outage: Repository<Outage>;
}
