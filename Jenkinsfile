pipeline {
    agent any

    environment {
        // Set USERPROFILE and JAVA_HOME environment variables
        USERPROFILE = "${env.USERPROFILE}" // Defaults to the current user's profile directory
        JAVA_HOME = "C:\\Program Files\\Java\\jdk-17" // Update this path to your actual Java installation path
        PATH = "${env.PATH};${env.JAVA_HOME}\\bin" // Adds the Java bin directory to PATH
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('LegacyCodeFE') {
                    bat '''
                    npm install
                    '''
                }
            }
        }

        stage('Delete pm2 instances') {
            steps {
                bat '''
                pm2 delete all || echo "No PM2 processes running"
                '''
            }
        }

        stage('Build LegacyCode Backend') {
            steps {
                dir('LegacyCode') {
                    bat '''
                    set USERPROFILE=%USERPROFILE%
                    del /Q target\\*.jar || echo "No previous JAR files to delete"
                    ./mvnw clean install -DskipTests
                    '''
                }
            }
        }

        stage('Build LegacyCodeCart Backend') {
            steps {
                dir('LegacyCodeCart') {
                    bat '''
                    set USERPROFILE=%USERPROFILE%
                    del /Q target\\*.jar || echo "No previous JAR files to delete"
                    ./mvnw clean install -DskipTests
                    '''
                }
            }
        }

        stage('Build Security Backend') {
            steps {
                dir('Security') {
                    bat '''
                    set USERPROFILE=%USERPROFILE%
                    set JAVA_HOME=%JAVA_HOME%
                    del /Q target\\*.jar || echo "No previous JAR files to delete"
                    ./mvnw clean install -DskipTests
                    '''
                }
            }
        }

        stage('Run All Applications') {
            parallel {
                stage('Run Frontend') {
                    steps {
                        dir('LegacyCodeFE') {
                            bat '''
                            pm2 start "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" -- start
                            '''
                        }
                    }
                }

                stage('Run LegacyCode Backend') {
                    steps {
                        dir('LegacyCode') {
                            bat '''
                            start /b java -jar target\\Items-BE-0.0.1-SNAPSHOT.jar > legacycode_run.log 2>&1
                            '''
                            bat 'type legacycode_run.log'
                        }
                    }
                }

                stage('Run LegacyCodeCart Backend') {
                    steps {
                        dir('LegacyCodeCart') {
                            bat '''
                            start /b java -jar target\\LegacyCodeCart-0.0.1-SNAPSHOT.jar > legacycodecart_run.log 2>&1
                            '''
                            bat 'type legacycodecart_run.log'
                        }
                    }
                }

                stage('Run Security Backend') {
                    steps {
                        dir('Security') {
                            bat '''
                            start /b java -jar target\\Security-0.0.1-SNAPSHOT.jar > security_run.log 2>&1
                            '''
                            bat 'type security_run.log'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Build failed, please check logs.'
        }
    }
}
