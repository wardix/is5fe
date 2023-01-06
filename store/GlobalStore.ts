import { atom } from 'jotai';

const navs = [
  {
    isParent: false,
    path: '/lead-pool',
    name: 'Lead Pool',
    icon: 'lead-pools',
    hideOnSelfOwn: false,
    permissions: ['prospect.lead_pools.view'],
  },
  {
    isParent: true,
    path: '/notification',
    name: 'Activity',
    icon: 'activity',
    hideOnSelfOwn: false,
    permissions: ['prospect.activities.view'],
    children: [
      {
        isParent: false,
        path: '/activity/task',
        name: 'Task',
        hideOnSelfOwn: false,
        permissions: ['prospect.activities.view'],
      },
      {
        isParent: false,
        path: '/activity/conversation-log',
        name: 'Conversation Log',
        hideOnSelfOwn: false,
        permissions: ['prospect.activities.view'],
      },
      {
        isParent: false,
        path: '/activity/check-in',
        name: 'Check In',
        permissions: ['prospect.activities.view'],
      },
    ],
  },
  {
    isParent: true,
    path: '/dashboard',
    name: 'User Management',
    icon: 'user-management',
    hideOnSelfOwn: true,
    permissions: [
      'user_management.user_&_group.view',
      'user_management.role_permission.view',
    ],
    children: [
      {
        isParent: false,
        path: '/dashboard/wew',
        name: 'User & Group',
        hideOnSelfOwn: true,
        permissions: ['user_management.user_&_group.view'],
      },
      {
        isParent: false,
        path: '/user/roles',
        name: 'Role Permission',
        hideOnSelfOwn: true,
        permissions: ['user_management.role_permission.view'],
      },
    ],
  },
];

export const navItemsAtom = atom(navs);
