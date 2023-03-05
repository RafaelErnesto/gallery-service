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
  timeout       = 300
  memory_size   = 128
}