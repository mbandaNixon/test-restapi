#!/bin/sh
host="http://localhost:3000"

echo "#add users:"
curl -X POST --data "name=Mark&score=100" "${host}/users"
echo " "
curl -X POST --data "name=Ivan&score=200" "${host}/users"
echo " "
curl -X POST --data "name=Petr&score=300" "${host}/users"
echo " "
curl -X POST --data "name=Alexander&score=400" "${host}/users"
echo " "
echo " "

echo "#get list users:"
curl -X GET "${host}/users"
echo " "
echo " "

echo "#get user by id:2"
curl -X GET "${host}/users/2"
echo " "
echo " "

echo "#get user by id=12345"
curl -X GET "${host}/users/12345"
echo " "
echo " "
echo "#update user id=2, score=1111"
curl -X PUT -d score=1111  "${host}/users/2"
echo " "
echo " "

echo "#get user by id=2"
curl -X GET "${host}/users/2"
echo " "
echo " "

echo "#delete user by id=2"
curl -X DELETE "${host}/users/2"
echo " "
echo " "


