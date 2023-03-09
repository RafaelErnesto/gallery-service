provider "aws" {
  access_key                  = "local"
  secret_key                  = "local"
  region                      = "us-east-1"
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3     = "http://s3.localhost.localstack.cloud:4566"
    lambda = "http://localhost:4566"
    logs   = "http://localhost:4566"
    iam    = "http://localhost:4566"
    apigateway  = "http://localhost:4566"
  }
}
