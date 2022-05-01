$(RESOURCE):
	-mkdir -p $(RESOURCE_DIR)
ifneq ($(strip $(MD5SUM_FILE)),)
	if [ ! -f $(MD5SUM_FILE) ]; then echo "Error: Couldn't find md5sum file $(MD5SUM_FILE)" && false; fi
	`rospack find rosbuild`/bin/download_checkmd5.py $(RESOURCE_URL) $(RESOURCE) `awk {'print $$1'} $(MD5SUM_FILE)`
else
	`rospack find rosbuild`/bin/download_checkmd5.py $(RESOURCE_URL) $(RESOURCE)
endif
	touch -c $(RESOURCE)

download: $(RESOURCE)

$(RESOURCE_DIR)/downloaded: $(RESOURCE_PATCH)
	-mkdir -p $(RESOURCE_DIR)
ifneq ($(strip $(MD5SUM_FILE)),)
	if [ ! -f $(MD5SUM_FILE) ]; then echo "Error: Couldn't find md5sum file $(MD5SUM_FILE)" && false; fi
	`rospack find rosbuild`/bin/download_checkmd5.py $(RESOURCE_URL) $(RESOURCE) `awk {'print $$1'} $(MD5SUM_FILE)`
else
	`rospack find rosbuild`/bin/download_checkmd5.py $(RESOURCE_URL) $(RESOURCE)
endif
	touch -c $(RESOURCE)
ifneq ($(strip $(RESOURCE_PATCH)),)
	cd $(RESOURCE_DIR) && $(foreach patch,$(RESOURCE_PATCH), patch -p0 < ../$(patch);)
endif
	touch $(RESOURCE_DIR)/downloaded

