import { v4 as uuidv4 } from 'uuid'

const ApplicationUserRoles = { Admin: 'Admin', User: 'User' } as const
export type ApplicationUserRoles = keyof typeof ApplicationUserRoles

export class User {
  public id = ''
  public userId = ''
  public role: ApplicationUserRoles = ApplicationUserRoles.User

  public static CreateNew(id: string): User {
    const user = new User()
    user.id = uuidv4()
    user.userId = id
    user.role = ApplicationUserRoles.User

    return user
  }
}
