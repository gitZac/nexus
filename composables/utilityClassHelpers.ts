export const useUtilityClassHelpers = () => {
  const parseCtaRoles = (roles: Array<string>) => {
    if (!roles.length) {
      return ["button--is-disabled"];
    }
    return roles.map((role: any) => `button--is-${role.item}`);
  };

  return {
    parseCtaRoles,
  };
};
