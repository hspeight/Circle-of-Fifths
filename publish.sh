date
rm index.zip
cd lambda/custom
#"C:\Program Files\7-Zip\7z" a -r ../index.zip *
7z a ../../index.zip  > /dev/null
cd ../..
printf "update function\n"
aws lambda update-function-code --function-name circleOfFifths --zip-file fileb://index.zip
