bundle exec jekyll serve --watch --incremental

bundle exec jekyll build
find ./_site -type f -name "*.html" -exec sed -i '' -e 's/\/http/http/g' {} +
find ./_site -type f -name "*.txt" -exec sed -i '' -e 's/\/http/http/g' {} +
find ./_site -type f -name "*.xml" -exec sed -i '' -e 's/\/http/http/g' {} +
cp -r _site/* ../svenmalvik.com/
