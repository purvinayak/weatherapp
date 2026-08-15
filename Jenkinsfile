pipeline {

    agent {
        label 'DockerBuild'
    }

    environment {
        DOCKER_IMAGE = 'purvinayak/weatherapp'
    }

    stages {

      stage('Checkout') {
    steps {
        git branch: 'main',
            url: 'https://github.com/purvinayak/weatherapp.git'
    }
}

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

      stage('React Build') {
    steps {
        sh 'CI=false npm run build'
    }
}

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                    -t ${DOCKER_IMAGE}:latest \
                    .
                '''
            }
        }

        stage('Docker Login') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                        -u "$DOCKER_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                    docker push ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop weatherapp || true
                '''
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '''
                    docker rm weatherapp || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker run -d \
                    --name weatherapp \
                    -p 8000:80 \
                    ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Verify Container') {
            steps {
                sh '''
                    docker ps
                '''
            }
        }
    }

    post {

        always {
            sh 'docker logout || true'
        }

        success {
            echo 'REACT APPLICATION DEPLOYED SUCCESSFULLY'
        }
    }
}