import { Injectable } from '@angular/core';
import { AbilityBuilder, createMongoAbility, MongoAbility, MongoQuery } from '@casl/ability';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppabilityService {
  ability: ReturnType<typeof createMongoAbility>
  current_user_data: any;

  constructor() {
    this.ability = createMongoAbility();
  }
  getAbility() {
    return this.ability;
  }

  updateAbility(currentData: any): void {
    const self = this;
    const { can, rules: updatedRules, build } = new AbilityBuilder(createMongoAbility);
    // Fetch user data from local storage 
    self.current_user_data = currentData;

    // Check if the user has permissions defined
    if (currentData?.permissions && currentData.permissions.length > 0) {
      currentData.permissions.forEach((permission: any) => {
        // Convert resource names to camelCase format (e.g., monitor.rule --> monitorRule)
        let resource = permission.resource.replace(/\.[a-z]/g, (match: any) => match[1].toUpperCase());
  
        // Apply the permission using 'can' function with resource and action
        can(permission.action, resource);
      });
    }
      this.ability = build();
  }
  
  // updateAbility(currentData: { _id: string }): void {
  //   const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
  //   const permissions = getPermissionsForUser(currentData._id);
  //   console.log("Permissions::" ,permissions)
  //   // Set abilities based on the user-specific permissions array
  //   permissions.forEach((permission: Permission) => {
  //     const { action, resource } = permission;
  //     can(action, resource);
  //   });

  //   // this.abilitySubject.next(build());
  //   this.ability = build();
  // }
}
