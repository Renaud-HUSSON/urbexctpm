# $1 --> DOCKER CONTAINER
# $2 --> MYSQL USER
# $3 --> MYSQL USER'S PASSWORD
# $4 --> MYSQL DATABASE
# $5 --> FILE WE WANT THE BACKUP IN
backup_db(){
  docker exec $1 /usr/bin/mysqldump -u $2 --password=$3 $4 > $5
}

# zips the images folder
zip_images(){
  cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P

  # Verify that "zip" command exists
  if ! type zip &> /dev/null
  then
    echo "zip could not be found"
    exit 1
  fi

  # Create the backup folder if it doesn't exist 
  if [ ! -d ./backup ] 
  then
    mkdir ./backup
  fi

  cd ./api/images
  zip -r ../../backup/images.zip ./
  cd ../../
}

zip_images
backup_db YOUR_DB_CONTAINER YOUR_DB_USER YOUR_USER_PASSWORD YOUR_DATABASE YOUR_BACKUP_FILE

echo "----------------------------------------------------"
echo "---------------------- DONE ------------------------"
echo "----------------------------------------------------"

exit 0