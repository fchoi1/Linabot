#!/bin/bash

trap '' 2 



function set-title(){
  if [[ -z "$ORIG" ]]; then
    ORIG=$PS1
  fi
  TITLE="\[\e]2;$*\a\]"
  PS1=${ORIG}${TITLE}
}

export -f set-title


if pgrep -x "roscore" > /dev/null
then
    echo "Roscore Running"
else
	roscore &
    TASK_PID=$!
    echo "Startin Roscore, PID: $TASK_PID"
fi

if ping linamar-desktop -c 4 ;
then
	echo "Linamar-desktop is pingable"

else
	echo "Failed to ping Linamar-desKtop"
	exit 1
fi

#ssh -o StrictHostKeyChecking=no linamar@linamar-desktop 'bash /home/linamar/Desktop/linabot_scripts.sh"'

gnome-terminal -t "Rplidar" --command "ssh -t linamar@linamar-desktop -X 'bash -c /home/linamar/Desktop/linabot_rplidar.sh; bash'"

gnome-terminal -t "Turtlebot" --command "ssh -t linamar@linamar-desktop -X 'bash -c /home/linamar/Desktop/linabot_turtlebot.sh; bash'"

gnome-terminal -t "Mjpeg Server" --command "ssh -t linamar@linamar-desktop -X 'bash -c /home/linamar/Desktop/linabot_stream.sh; bash'"


gnome-terminal --command "roslaunch linabot.launch map_file:=/home/ubuntu/Desktop/office_new_3.yaml"
