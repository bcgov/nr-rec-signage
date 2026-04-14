# -------------------------------------------------------------------
# Database Module (First)
# -------------------------------------------------------------------

# -------------------------------------------------------------------
# Frontend Module (Third)
# -------------------------------------------------------------------
module "frontend" {
  source = "./modules/frontend"

  app_env                = var.app_env
  app_name               = var.app_name
  common_tags            = var.common_tags
  repo_name              = var.repo_name
  target_env             = var.target_env

  providers = {
    aws.us-east-1 = aws.us-east-1
  }

  depends_on = [module.api]
}
