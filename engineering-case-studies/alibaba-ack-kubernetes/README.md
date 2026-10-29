# Alibaba Cloud ACK & Kubernetes — reference architecture

**Type:** independent reference design. **Status:** documented and example Kubernetes manifests; not a claim of an actual production deployment.

## Architecture

```text
Client
  |
Public DNS / TLS
  |
Alibaba Cloud ALB (configured through supported ingress integration)
  |
ACK managed Kubernetes cluster
  |
Ingress -> Service -> Application pods
                       |
                 Readiness / liveness
                 Resource limits
                 Horizontal scaling
```

The ALB integration, target type, security groups, certificates and ACK ingress controller configuration depend on the ACK cluster mode, controller version and environment. Do **not** apply the example without validating these.

## Concepts represented

- **ACK:** managed Kubernetes control plane and workload orchestration.
- **Kubernetes:** Deployments, Services, health probes, rollout strategies and autoscaling.
- **ALB:** traffic entry point, certificates and hostname/path-based routing where configured.
- **ECI:** serverless container capability in Alibaba Cloud, a separate deployment/runtime option; it is **not required** by the example manifests.
- **Observability:** service and ingress metrics, deployment health, events and alerting.

## Example application manifests

See [deployment.yaml](deployment.yaml). It deploys a public demonstration NGINX container with two replicas and explicit health/resource controls. This is **not** a Rails production architecture, and no database or secrets are included.

## Validation checklist

1. Select an ACK cluster with a supported Kubernetes version and ingress integration.
2. Configure network/security groups, permissions, registry, TLS termination and DNS appropriately.
3. Apply the sample workload in an isolated namespace.
4. Validate rollout, readiness, Service endpoints and HTTP responses.
5. Confirm scaling behavior only after cluster metrics-server / autoscaling prerequisites are installed.
6. Collect deployment events, ingress metrics and tested recovery behavior.
7. Document cost and availability assumptions before proposing this for production.

## Trade-offs and risks

- A Kubernetes cluster adds operational complexity and recurring cost compared with smaller managed/container options.
- HPA needs usable metrics and suitable resource requests.
- Probes must reflect actual app readiness, not just whether a process is alive.
- An ALB requires provider-specific integration; a generic Ingress object alone does not guarantee ALB provisioning.
- Never expose actual client architecture, credentials, routes or addresses in public case studies.

## Evidence status

**No deployment logs, autoscaling metrics or availability outcomes have been collected for this reference example.** Future claims require dated, reproducible evidence.
