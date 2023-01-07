export interface NavChild {
  isParent: boolean;
  path: string;
  name: string;
  hideOnSelfOwn?: boolean;
  permissions: string[];
  children?: NavChild[];
}

export interface NavParent {
  isParent: boolean;
  path: string;
  name: string;
  icon: string;
  hideOnSelfOwn?: boolean;
  permissions: string[];
  children?: NavChild[];
}
