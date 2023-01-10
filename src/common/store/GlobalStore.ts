import { atom } from 'jotai';
import helpDocs from '../helps';

const navs = [
  {
    isParent: false,
    path: '/notification',
    name: 'Lead Pool',
    icon: 'lead-pools',
    hideOnSelfOwn: false,
    permissions: ['prospect.lead_pools.view'],
  },
  {
    isParent: true,
    path: '/dashboard',
    name: 'Activity',
    icon: 'activity',
    hideOnSelfOwn: false,
    permissions: ['prospect.activities.view'],
    children: [
      {
        isParent: false,
        path: '/dashboard/example',
        name: 'Task',
        hideOnSelfOwn: false,
        permissions: ['prospect.activities.view'],
      },
      {
        isParent: false,
        path: '/dashboard/conversation-log',
        name: 'Conversation Log',
        hideOnSelfOwn: false,
        permissions: ['prospect.activities.view'],
      },
      {
        isParent: false,
        path: '/dashboard/check-in',
        name: 'Check In',
        permissions: ['prospect.activities.view'],
      },
    ],
  },
  // {
  //   isParent: true,
  //   path: '/dashboard',
  //   name: 'User Management',
  //   icon: 'user-management',
  //   hideOnSelfOwn: true,
  //   permissions: [
  //     'user_management.user_&_group.view',
  //     'user_management.role_permission.view',
  //   ],
  //   children: [
  //     {
  //       isParent: false,
  //       path: '/dashboard/wew',
  //       name: 'User & Group',
  //       hideOnSelfOwn: true,
  //       permissions: ['user_management.user_&_group.view'],
  //     },
  //     {
  //       isParent: false,
  //       path: '/user/roles',
  //       name: 'Role Permission',
  //       hideOnSelfOwn: true,
  //       permissions: ['user_management.role_permission.view'],
  //     },
  //   ],
  // },
];

const helpContents = [
  {
    id: 'general',
    label: 'General',
    // contents: helpDocs.generalHelp,
  },
  {
    id: 'lead',
    label: 'Lead',
    contents: helpDocs.example,
  },
  {
    id: 'account',
    label: 'Account',
    // contents: helpDocs.accountHelp,
  },
  {
    id: 'contact',
    label: 'Contacts',
    // contents: helpDocs.contactHelp,
  },
  {
    id: 'opportunity',
    label: 'Opportunity',
    // contents: helpDocs.opportunityHelp,
  },
  {
    id: 'leadPool',
    label: 'Lead Pool',
    // contents: helpDocs.leadPoolHelp,
  },
  {
    id: 'activity',
    label: 'Activity',
    // contents: helpDocs.activityHelp,
  },
  {
    id: 'noteAndFiles',
    label: 'Note & File',
    // contents: helpDocs.noteAndFileHelp,
  },
  {
    id: 'reseller',
    label: 'Reseller',
    // contents: helpDocs.resellerHelp,
  },
  {
    id: 'report',
    label: 'Report',
    // contents: helpDocs.reportHelp,
  },
  {
    id: 'userManagement',
    label: 'User Management',
    // contents: helpDocs.userManagementHelp,
  },
  {
    id: 'setting',
    label: 'Setting',
    // contents: helpDocs.settingHelp,
  },
  {
    id: 'log',
    label: 'Log',
    // contents: helpDocs.logHelp,
  },
];

export const navItemsAtom = atom(navs);
export const isOpenHelpDrawerAtom = atom<boolean>(false);
export const helpContentsAtom = atom(helpContents);
export const selectedHelpContentAtom = atom<string | null>(null);
