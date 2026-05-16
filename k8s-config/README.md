# Kubernetes Kustomize

Thu muc nay quan ly manifest Kubernetes theo 1 base va 3 overlay:

- `base`: dung chung cho backend, frontend, ingress va database.
- `overlays/dev`: namespace `dev`, host `dev.blogapp.local`, replica toi thieu.
- `overlays/test`: namespace `test`, host `test.blogapp.local`, replica toi thieu.
- `overlays/production`: namespace `production`, host `blogapp.local`, replica production cho cac service stateless.

## Lenh su dung

```bash
kubectl apply -k k8s-config/overlays/dev
kubectl apply -k k8s-config/overlays/test
kubectl apply -k k8s-config/overlays/production
```

Kiem tra manifest truoc khi apply:

```bash
kubectl kustomize k8s-config/overlays/dev
kubectl diff -k k8s-config/overlays/production
```

Neu chay local voi NGINX Ingress, them host vao file hosts cua may ban, vi du:

```text
127.0.0.1 dev.blogapp.local
127.0.0.1 test.blogapp.local
127.0.0.1 blogapp.local
```
