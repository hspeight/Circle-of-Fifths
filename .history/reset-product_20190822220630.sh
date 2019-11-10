#!/bin/ksh93

case $1 in
	'relative-keys')
		ask api reset-isp-entitlement --isp-id amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f
		;;
	'key-signatures')
		ask api reset-isp-entitlement --isp-id amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014
		;;
  'all')
    ask api reset-isp-entitlement --isp-id amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f
		ask api reset-isp-entitlement --isp-id amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014
    ;;
	*)
		echo '********* COULD NOT MATCH REF *************'
		;;
esac