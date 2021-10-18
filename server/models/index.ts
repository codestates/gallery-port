import User, {associate as associateUser} from './user';
import Project, {associate as associateProject} from './project';
import Stack, {associate as associateStack} from './stack';
export * from './sequelize';

const db = {
    User,
    Project,
    Stack
}

export type dbType = typeof db; 
associateUser(db)
associateProject(db);
associateStack(db);