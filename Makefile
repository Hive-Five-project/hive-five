.SILENT:

-include make/text.mk
-include make/help.mk
-include make/url.mk

## Dev - Start the whole application for development purposes
serve:
	# https://www.npmjs.com/package/concurrently
	$(call hive_message_success, App is running on http://127.0.0.1:63281)
	npx concurrently "cd back && make serve.docker" "cd back && make serve.php" "cd front && make serve" --names="Docker,Symfony,React" --prefix=name --kill-others --kill-others-on-fail
