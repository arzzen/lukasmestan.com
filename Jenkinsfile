node {
  stage 'Stage Update'
  echo "My branch is: ${env.BRANCH_NAME}"
  sh "cd /var/www/lukasmestan.com && git pull origin master && bundle exec jekyll build && bundle exec htmlproofer ./_site --only-4xx"  
}
