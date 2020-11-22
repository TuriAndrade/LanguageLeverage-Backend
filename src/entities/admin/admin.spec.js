import createAdmin from "./index";
import createFakeAdmin from "../../../__tests__/fixtures/fakeAdmin";

describe("Admin", () => {
  it("should create admin", () => {
    const admin = createFakeAdmin();

    expect(createAdmin(admin)).toEqual(
      expect.objectContaining({
        getLogin: expect.any(Function),
        getPassword: expect.any(Function),
        getName: expect.any(Function),
        getEmail: expect.any(Function),
        hasPassword: expect.any(Function),
        getHasFullPermission: expect.any(Function),
        getUserId: expect.any(Function),
        grantFullPermission: expect.any(Function),
        removeFullPermission: expect.any(Function),
        hasUser: expect.any(Function),
      })
    );
  });

  it("should grant full permission", () => {
    const notPermittedAdmin = createAdmin(
      createFakeAdmin({ hasFullPermission: false })
    );

    expect(notPermittedAdmin.getHasFullPermission()).toBe(false);

    notPermittedAdmin.grantFullPermission();

    expect(notPermittedAdmin.getHasFullPermission()).toBe(true);
  });

  it("should remove full permission", () => {
    const permittedAdmin = createAdmin(
      createFakeAdmin({ hasFullPermission: true })
    );

    expect(permittedAdmin.getHasFullPermission()).toBe(true);

    permittedAdmin.removeFullPermission();

    expect(permittedAdmin.getHasFullPermission()).toBe(false);
  });

  it("should set user id", () => {
    const adminWithoutUserId = createAdmin(
      createFakeAdmin({ userId: null, withNoUserId: true })
    );

    expect(adminWithoutUserId.getUserId()).toBeFalsy();

    adminWithoutUserId.setUserId(1);

    expect(adminWithoutUserId.getUserId()).toBe(1);
  });

  it("should create admin with no user", () => {
    const adminWithNoUser = createAdmin(
      createFakeAdmin({ user: undefined, withNoUser: true })
    );

    expect(adminWithNoUser).toEqual(
      expect.objectContaining({
        getHasFullPermission: expect.any(Function),
        getUserId: expect.any(Function),
        grantFullPermission: expect.any(Function),
        removeFullPermission: expect.any(Function),
        hasUser: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid user ids", () => {
    const admin = createAdmin(createFakeAdmin());

    expect(() => admin.setUserId(null)).toThrowError();

    expect(() => admin.setUserId("I'm not a number!")).toThrowError();

    expect(() => createAdmin(createFakeAdmin({ userId: null }))).toThrowError();
  });

  it("should throw errors for invalid users", () => {
    const adminWithNoUser = createFakeAdmin({ user: {} });

    expect(() => createAdmin(adminWithNoUser)).toThrowError();

    const adminWithNoLogin = createFakeAdmin({
      user: {
        getLogin: null,
        getPassword: () => "12345678",
        getEmail: () => "email@email.com",
        getName: () => "name",
      },
    });

    expect(() => createAdmin(adminWithNoLogin)).toThrowError();

    const adminWithNoPass = createFakeAdmin({
      user: {
        getLogin: () => "login",
        getPassword: null,
        getEmail: () => "email@email.com",
        getName: () => "name",
      },
    });

    expect(() => createAdmin(adminWithNoPass)).toThrowError();

    const adminWithNoEmail = createFakeAdmin({
      user: {
        getLogin: () => "login",
        getPassword: () => "12345678",
        getEmail: null,
        getName: () => "name",
      },
    });

    expect(() => createAdmin(adminWithNoEmail)).toThrowError();

    const adminWithNoName = createFakeAdmin({
      user: {
        getLogin: () => "login",
        getPassword: () => "12345678",
        getEmail: () => "email@email.com",
        getName: null,
      },
    });

    expect(() => createAdmin(adminWithNoName)).toThrowError();
  });

  it("should throw errors for invalid values for permissions", () => {
    const undefinedPermissions = createFakeAdmin({
      hasFullPermission: undefined,
    });

    expect(() => createAdmin(undefinedPermissions)).toThrowError();

    const nonBooleanPermissions = createFakeAdmin({
      hasFullPermission: "Im not a boolean",
    });

    expect(() => createAdmin(nonBooleanPermissions)).toThrowError();
  });

  it("should throw errors for invalid user ids", () => {
    const nonNumericUserId = createFakeAdmin({
      userId: "Im not a number",
    });

    expect(() => createAdmin(nonNumericUserId)).toThrowError();
  });
});
