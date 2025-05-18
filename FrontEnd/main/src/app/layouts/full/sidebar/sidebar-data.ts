import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:chart-2-line-duotone',
    route: '/dashboard',
  },
  {
    divider: true,
    navCap: 'Mission & paiement',
  },
  {
    displayName: 'Mission',
    iconName: 'solar:checklist-minimalistic-broken',
    route: '/ui-components/mission',
  },
  {
    displayName: 'Paiement',
    iconName: 'solar:dollar-line-duotone',
    route: '/ui-components/paiement',
  },
  {
    navCap: 'Administration',
    divider: true
  },
  {
    displayName: 'Employé',
    iconName: 'solar:users-group-rounded-bold-duotone',
    route: '/ui-components/employee',
  },
  {
    displayName: 'Affectation',
    iconName: 'solar:globus-line-duotone',
    route: '/ui-components/affectation',
  },
  {
    displayName: 'Fonction',
    iconName: 'solar:user-id-bold-duotone',
    route: '/ui-components/fonction',
  },
  {
    displayName: 'Vehicule',
    iconName: 'solar:bus-bold-duotone',
    route: '/ui-components/vehicule',
  } ,
  {
    displayName: 'Congé',
    iconName: 'solar:calendar-date-bold-duotone',
    route: '/ui-components/conge',
  } 
];
