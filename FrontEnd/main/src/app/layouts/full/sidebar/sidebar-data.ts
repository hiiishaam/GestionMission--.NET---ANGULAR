import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
  },
  {
    divider: true,
    navCap: 'Mission & paiement',
  },
  {
    displayName: 'Mission',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/mission',
  },
  {
    displayName: 'Paiement',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/paiement',
  },
  {
    navCap: 'Administration',
    divider: true
  },
  {
    displayName: 'Employee',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/employee',
  },
  {
    displayName: 'Affectation',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/affectation',
  },
  {
    displayName: 'Fonction',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/fonction',
  },
  {
    displayName: 'Vehicule',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/vehicule',
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      }
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      }
    ],
  }  
];
