import retrieveUserManagementUsers, {
  JIRA_SOFTWARE_GROUP,
  JIRA_CORE_GROUP,
  JIRA_SERVICE_DESK_GROUP,
  SITE_ADMINS_GROUP,
} from '../common/retrieveUserManagementUsers';

const VALID_GROUPS = [
  JIRA_SOFTWARE_GROUP,
  JIRA_CORE_GROUP,
  JIRA_SERVICE_DESK_GROUP,
  SITE_ADMINS_GROUP,
];

export default retrieveUserManagementUsers(VALID_GROUPS);
