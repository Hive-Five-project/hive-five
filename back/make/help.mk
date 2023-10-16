########
# Help #
########

.DEFAULT_GOAL := help

HIVE_HELP = \
	Usage: make [$(HIVE_COLOR_INFO)command$(HIVE_COLOR_RESET)] \
	$(call hive_help_section, Help) \
	$(call hive_help,help,This help)

define hive_help_section
	\n\n$(HIVE_COLOR_COMMENT)$(strip $(1)):$(HIVE_COLOR_RESET)
endef

define hive_help
  \n  $(HIVE_COLOR_INFO)$(1)$(HIVE_COLOR_RESET) $(2)
endef

help:
	@printf "\n$(HIVE_HELP)"
	@awk ' \
		BEGIN { \
			sectionsName[1] = "Commands" ; \
			sectionsCount = 1 ; \
		} \
		/^[-a-zA-Z0-9_.@%\/+]+:/ { \
			if (match(lastLine, /^## (.*)/)) { \
				command = substr($$1, 1, index($$1, ":") - 1) ; \
				section = substr(lastLine, RSTART + 3, index(lastLine, " - ") - 4) ; \
				if (section) { \
					message = substr(lastLine, index(lastLine, " - ") + 3, RLENGTH) ; \
					sectionIndex = 0 ; \
					for (i = 1; i <= sectionsCount; i++) { \
						if (sectionsName[i] == section) { \
							sectionIndex = i ; \
						} \
					} \
					if (!sectionIndex) { \
						sectionIndex = sectionsCount++ + 1 ; \
						sectionsName[sectionIndex] = section ; \
					} \
				} else { \
					message = substr(lastLine, RSTART + 3, RLENGTH) ; \
					sectionIndex = 1 ; \
				} \
				if (length(command) > sectionsCommandLength[sectionIndex]) { \
					sectionsCommandLength[sectionIndex] = length(command) ; \
				} \
				sectionCommandIndex = sectionsCommandCount[sectionIndex]++ + 1; \
				helpsCommand[sectionIndex, sectionCommandIndex] = command ; \
				helpsMessage[sectionIndex, sectionCommandIndex] = message ; \
			} \
		} \
		{ lastLine = $$0 } \
		END { \
			for (i = 1; i <= sectionsCount; i++) { \
				if (sectionsCommandCount[i]) { \
					printf "\n\n$(HIVE_COLOR_COMMENT)%s:$(HIVE_COLOR_RESET)", sectionsName[i] ; \
					for (j = 1; j <= sectionsCommandCount[i]; j++) { \
						printf "\n  $(HIVE_COLOR_INFO)%-" sectionsCommandLength[i] "s$(HIVE_COLOR_RESET) %s", helpsCommand[i, j], helpsMessage[i, j] ; \
					} \
				} \
			} \
		} \
	' $(MAKEFILE_LIST)
	@printf "\n\n"
	@printf "$(if $(HIVE_HELP_PROJECT),$(HIVE_HELP_PROJECT)\n\n)"
.PHONY: help

help.project:
	@printf "$(if $(HIVE_HELP_PROJECT),\n$(HIVE_HELP_PROJECT)\n\n)"
