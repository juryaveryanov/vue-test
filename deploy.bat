@echo off
npm run build&&cd dist&&git init&&git add -A&&git commit -m 'deploy'&&git push -f https://github.com/juryaveryanov/vue-test.git master:gh-pages&&cd ..
