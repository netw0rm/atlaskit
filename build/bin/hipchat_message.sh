#!/bin/bash
set -e

message=$@
curl -d "{\"color\":\"green\",\"message\":\"$message\",\"notify\":false,\"message_format\":\"text\"}" -H 'Content-Type: application/json' https://atlassian.hipchat.com/v2/room/308541/notification?auth_token=$HIPCHAT_DESIGN_PLATFORM_AUTH_TOKEN
