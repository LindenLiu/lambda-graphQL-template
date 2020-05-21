#! /bin/bash

awk '$1 == "custom:"{t=1} t==1 && /:[[:blank:]]*$/{t=0} t != 1' serverless.yml | awk '$1 == "plugins:"{t=1} t==1 && /:[[:blank:]]*$/{t=0} t != 1' > serverless.aws.yml
npm install -g serverless 
serverless deploy --stage $stage --package $CODEBUILD_SRC_DIR/target/$stage -v -r $region -c serverless.aws.yml