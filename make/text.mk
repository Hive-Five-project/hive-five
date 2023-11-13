##########
# Colors #
##########

HIVE_COLOR_RESET   := \033[0m
HIVE_COLOR_ERROR   := \033[31m
HIVE_COLOR_INFO    := \033[32m
HIVE_COLOR_WARNING := \033[33m
HIVE_COLOR_COMMENT := \033[36m

######################
# Special Characters #
######################

# Usage:
#   $(call hive_message, Foo$(,) bar) = Foo, bar
#   $(call hive_message, $(lp)Foo bar) = (Foo bar
#   $(call hive_message, Foo$(rp) bar) = Foo) bar

, := ,
lp := (
rp := )

########
# Time #
########

# Usage:
#   $(call hive_time) = 11:06:20

define hive_time
`date -u +%T`
endef

###########
# Message #
###########

# Usage:
#   $(call hive_message, Foo bar)         = Foo bar
#   $(call hive_message_success, Foo bar) = (っ◕‿◕)っ Foo bar
#   $(call hive_message_warning, Foo bar) = ¯\_(ツ)_/¯ Foo bar
#   $(call hive_message_error, Foo bar)   = (╯°□°)╯︵ ┻━┻ Foo bar

define hive_message
	printf "$(HIVE_COLOR_INFO)$(strip $(1))$(HIVE_COLOR_RESET)\n"
endef

define hive_message_success
	printf "$(HIVE_COLOR_INFO)(っ◕‿◕)っ $(strip $(1))$(HIVE_COLOR_RESET)\n"
endef

define hive_message_warning
	printf "$(HIVE_COLOR_WARNING)¯\_(ツ)_/¯ $(strip $(1))$(HIVE_COLOR_RESET)\n"
endef

define hive_message_error
	printf "$(HIVE_COLOR_ERROR)(╯°□°)╯︵ ┻━┻ $(strip $(1))$(HIVE_COLOR_RESET)\n"
endef

#######
# Log #
#######

# Usage:
#   $(call hive_log, Foo bar)         = [11:06:20] [target] Foo bar
#   $(call hive_log_warning, Foo bar) = [11:06:20] [target] ¯\_(ツ)_/¯ Foo bar
#   $(call hive_log_error, Foo bar)   = [11:06:20] [target] (╯°□°)╯︵ ┻━┻ Foo bar

define hive_log
	printf "[$(HIVE_COLOR_COMMENT)$(call hive_time)$(HIVE_COLOR_RESET)] [$(HIVE_COLOR_COMMENT)$(@)$(HIVE_COLOR_RESET)] " ; $(call hive_message, $(1))
endef

define hive_log_warning
	printf "[$(HIVE_COLOR_COMMENT)$(call hive_time)$(HIVE_COLOR_RESET)] [$(HIVE_COLOR_COMMENT)$(@)$(HIVE_COLOR_RESET)] "  ; $(call hive_message_warning, $(1))
endef

define hive_log_error
	printf "[$(HIVE_COLOR_COMMENT)$(call hive_time)$(HIVE_COLOR_RESET)] [$(HIVE_COLOR_COMMENT)$(@)$(HIVE_COLOR_RESET)] " ;  $(call hive_message_error, $(1))
endef

###########
# Confirm #
###########

# Usage:
#   $(call hive_confirm, Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):
#   $(call hive_confirm, Bar foo, y) = ༼ つ ◕_◕ ༽つ Foo bar (Y/n):

define hive_confirm
	$(if $(CONFIRM),, \
		printf "$(HIVE_COLOR_INFO) ༼ つ ◕_◕ ༽つ $(HIVE_COLOR_WARNING)$(strip $(1)) $(HIVE_COLOR_RESET)$(HIVE_COLOR_WARNING)$(if $(filter y,$(2)),(Y/n),(y/N))$(HIVE_COLOR_RESET): " ; \
		read CONFIRM ; \
		case $$CONFIRM in $(if $(filter y,$(2)), \
			[nN]$(rp) printf "\n" ; exit 1 ;; *$(rp) ;;, \
			[yY]$(rp) ;; *$(rp) printf "\n" ; exit 1 ;; \
		) esac \
	)
endef

################
# Conditionals #
################

# Usage:
#   $(call hive_error_if_not, $(FOO), FOO has not been specified) = (╯°□°)╯︵ ┻━┻ FOO has not been specified

define hive_error_if_not
	$(if $(strip $(1)),, \
		$(call hive_message_error, $(strip $(2))) ; exit 1 \
	)
endef

# Usage:
#   $(call hive_confirm_if, $(FOO), Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):

define hive_confirm_if
	$(if $(strip $(1)), \
		$(call hive_confirm, $(strip $(2)))
	)
endef

# Usage:
#   $(call hive_confirm_if_not, $(FOO), Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):

define hive_confirm_if_not
	$(if $(strip $(1)),, \
		$(call hive_confirm, $(strip $(2)))
	)
endef

##########
# Random #
##########

# Usage:
#   $(call hive_rand, 8) = 8th56zp2

define hive_rand
`cat /dev/urandom | LC_ALL=C tr -dc 'a-z0-9' | fold -w $(strip $(1)) | head -n 1`
endef
