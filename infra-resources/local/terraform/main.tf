resource "aws_api_gateway_rest_api" "gallery-service-rest" {
  name = "gallery-service-rest"
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.gallery-service-rest.id
  parent_id   = aws_api_gateway_rest_api.gallery-service-rest.root_resource_id
  path_part   = "gallery-service"
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = aws_api_gateway_rest_api.gallery-service-rest.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  type                    = "AWS"
  rest_api_id             = aws_api_gateway_rest_api.gallery-service-rest.id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = aws_api_gateway_method.method.http_method

  uri = aws_lambda_function.gallery-service.invoke_arn
}

resource "aws_iam_role" "fake_lambda_role" {
  name = "fake_lambda_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "dev-images" {
  bucket = "dev-images"
}

resource "aws_lambda_function" "gallery-service" {
  function_name = "gallery-service"
  filename      = "function.zip"
  handler       = "main"
  role          = aws_iam_role.fake_lambda_role.arn
  runtime       = "nodejs16.x"
  timeout       = 1
  memory_size   = 128
}