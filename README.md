bundle exec jekyll serve --watch --incremental

bundle exec jekyll build
cp -r _site/* ../svenmalvik.com/
find . -type f -name "*.xml" -exec sed -i '' -e 's/\/http/http/g' {} +
find . -type f -name "*.html" -exec sed -i '' -e 's/\/http/http/g' {} +
find . -type f -name "*.txt" -exec sed -i '' -e 's/\/http/http/g' {} +




main background
link
link hoover
sticky background; headline color; dark button
text color
light button
text field


