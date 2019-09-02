/etc/init.d/nginx start
npm run build
rm -R /usr/share/nginx/html/*
cp -R ./dist/* /usr/share/nginx/html
while inotifywait -r -e modify --excludei '.*\.sw.*' ./src; do echo "building" && npm run build && rm -R /usr/share/nginx/html/* && cp -R ./dist/* /usr/share/nginx/html && "done building"; done
