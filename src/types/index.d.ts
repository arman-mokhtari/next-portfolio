export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface EmailParams {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}