pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                // Navigate to the LegacyCodeFE folder and run npm commands for the front end
                dir('LegacyCodeFE') {
                    sh 'npm install'
                    sh 'npm run build' // Replace this with your specific front-end build command if different
                }
            }
        }

        stage('Build LegacyCode Backend') {
            steps {
                // Navigate to the LegacyCode folder and build the Spring Boot application
                dir('LegacyCode') {
                    // Build using Maven Wrapper or Gradle
                    sh './mvnw clean install' // Adjust if using Maven installed on the server

                }
            }
        }

        stage('Build LegacyCodeCart Backend') {
            steps {
                // Navigate to the LegacyCodeCart folder and build the Spring Boot application
                dir('LegacyCodeCart') {
                    // Build using Maven Wrapper or Gradle
                    sh './mvnw clean install' // Adjust if using Maven installed on the server

                }
            }
        }

        stage('Run Spring Boot Applications') {
            steps {
                script {
                    // Run the Spring Boot applications using the generated JAR files
                    sh 'nohup java -jar LegacyCode/target/*.jar &' // Adjust the path to your specific jar if named differently
                    sh 'nohup java -jar LegacyCodeCart/target/*.jar &' // Adjust the path if necessary
                }
            }
        }
    }

    post {
        always {
            // Optional: Add any cleanup or archive steps if needed
        }
    }
}
