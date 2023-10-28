########
# Help #
########

HIVE_HELP_PROJECT = $(HIVE_COLOR_COMMENT)┏(°.°)┛┗(°.°)┓$(HIVE_COLOR_RESET) ♪♫ Let's party ♫♪ $(HIVE_COLOR_COMMENT)┗(°.°)┛┏(°.°)┓$(HIVE_COLOR_RESET)\n
HIVE_HELP_PROJECT += $(call hive_help,Front,            http://127.0.0.1:63281)
HIVE_HELP_PROJECT += $(call hive_help,Back,             http://127.0.0.1:63280)
HIVE_HELP_PROJECT += $(call hive_help,Mailer,           http://127.0.0.1:62551)
HIVE_HELP_PROJECT += $(call hive_help,GraphiQL,         http://127.0.0.1:63280/graphiql)
HIVE_HELP_PROJECT += $(call hive_help,Symfony profiler, http://127.0.0.1:63280/_profiler)
