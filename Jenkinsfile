#!groovy

node {
    def workspace = "/var/www/lukasmestan.com"

    stage('Init') {
        echo "Branch: ${env.BRANCH_NAME}"
        sh "cd ${workspace} && git pull origin master"
    }

    stage('Build') {
        sh "cd ${workspace} && bundle exec jekyll build"
    }

    stage('Deploy') {
        sh "cd ${workspace} && bundle exec htmlproofer ./_site --only-4xx"
    }
}
