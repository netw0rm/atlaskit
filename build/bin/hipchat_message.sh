#!/bin/sh
message=$@
curl -d "{\"color\":\"green\",\"message\":\"$message\",\"notify\":false,\"message_format\":\"text\"}" -H 'Content-Type: application/json' https://atlassian.hipchat.com/v2/room/2709310/notification?auth_token=$HIPCHAT_ADG3DEV_AUTH_TOKEN
