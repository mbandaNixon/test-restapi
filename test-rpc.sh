#!/bin/sh
URL="http://localhost:3000/rpc"
HDR="Content-type: application/json"
echo "# Добавление:"
MSG='{"jsonrpc": "2.0", "method": "add", "params": {"name":"Ivan", "score":10}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo ""
MSG='{"jsonrpc": "2.0", "method": "add", "params": {"name":"Petr", "score":20}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo ""
MSG='{"jsonrpc": "2.0", "method": "add", "params": {"name":"Mark", "score":9}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo ""
echo ""

echo "# Запрос всего списка:"
MSG='{"jsonrpc": "2.0", "method": "getall", "params": {}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo ""
echo ""

echo "# Запрос по id:"
MSG='{"jsonrpc": "2.0", "method": "get", "params": {"id":1}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo " "

echo "# Удаление по id:"
MSG='{"jsonrpc": "2.0", "method": "del", "params": {"id":1}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo " "
echo " "

echo "# Обновление по id:"
MSG='{"jsonrpc": "2.0", "method": "update", "params": {"id":1, "score":2222, "name":"NNNNNNNemo"}, "id": 1111}'
echo " "
echo " "

echo "# Запрос всего списка:"
MSG='{"jsonrpc": "2.0", "method": "getall", "params": {}, "id": 100}'
curl -H "$HDR" -d "$MSG" "$URL"
echo ""
echo ""








