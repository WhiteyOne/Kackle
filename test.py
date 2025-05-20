from random import choice

dummy_users = ["cayden", "raina", "steph", "mason", "mikaela", "corey"]
dummer_servers = ["app academy", "career search", "onboarding"]


def dummy_seeder():
    fake_relationships = []

    for user in dummy_users:
        amt_of_servers_to_join = choice([1, 3])
        for i in range(amt_of_servers_to_join):
            server_id_to_join = choice([0, len(dummer_servers) - 1])
            random_server = dummer_servers[server_id_to_join]
            # user.user_servers.extend([user, random_server])
            fake_relationships.append([user, random_server])

    return fake_relationships


print(dummy_seeder())
