from django.contrib.auth.models import Group, User, Permission

edit_profile_permission = Permission.objects.create(
    codename = 'edit profile',
    name = 'can edit profile',
)

base_user_group = Group.objects.create(name='User Group')
user = User.objects.get(username="vaughnned")
user.groups.add(base_user_group)

base_user_group.permissions.add(edit_profile_permission)