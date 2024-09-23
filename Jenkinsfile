pipeline {
    agent any

    environment {
        // Define the path to Node.js and PM2 if needed
        PATH = "${env.PATH};C:\\Program Files\\nodejs;C:\\Program Files\\nodejs\\node_modules\\npm\\bin"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Running npm install to install dependencies
                bat '''
                cd LegacyCodeFE
                npm install
                '''
            }
        }

        stage('Stop PM2 Processes') {
            steps {
                // Stopping all running PM2 processes
                bat '''
                pm2 delete all || echo "No PM2 processes running"
                '''
            }
        }

        stage('Run Frontend') {
            steps {
                // Starting the front-end application using PM2
                bat '''
                pm2 start npm --name "frontend" -- run start
                '''
            }
        }

        stage('Build and Run Spring Boot Applications') {
            parallel {
                stage('Build and Run LegacyCode') {
                    steps {
                        // Build and run Spring Boot application from LegacyCode
                        dir('LegacyCode') {
                            bat 'mvnw clean install' // Adjust command if mvnw is not present or maven is installed
                            bat 'java -jar target\\*.jar'
                        }
                    }
                }

                stage('Build and Run LegacyCodeCart') {
                    steps {
                        // Build and run Spring Boot application from LegacyCodeCart
                        dir('LegacyCodeCart') {
                            bat 'mvnw clean install' // Adjust command if mvnw is not present or maven is installed
                            bat 'java -jar target\\*.jar'
                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            // Actions on failure, such as sending notifications or cleaning up
            echo 'Build failed, please check logs.'
        }
        always {
            // Actions that run after every build, like archiving logs or reports
            echo 'Pipeline finished.'
        }
    }
}
