#!/bin/ksh93

#dialog001.rep - Reset all purchases. Open first time, complete drill then stop (need to hard right & wrong answer)

SKILLROOT=/mnt/d/CircleOffifths

#OP=$2
#for arg
#do
#echo "!!! $arg" >> $REPLAYPATH.log2
	SEQ=$1
	typeset -RZ3 SEQ
	REPLAYPATH=$SKILLROOT/test/replay/$SEQ/dialog$SEQ

	echo "Deleting table record.."
	echo Replaying wth "$REPLAYPATH.rep"

	case $SEQ in
		001)
			aws dynamodb delete-item --table-name COF-USERS --key file://key.json
			ask api reset-isp-entitlement --isp-id amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f
			ask api reset-isp-entitlement --isp-id amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014
			;;
		002)
			# don't do anything
			;;
		003)
			#ask api reset-isp-entitlement --isp-id amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f
			#ask api reset-isp-entitlement --isp-id amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014
			;;
		*)
			echo '********* COULD NOT MATCH REF *************'
			;;
	esac

	ask dialog -r $REPLAYPATH.rep -o $REPLAYPATH.log
#done