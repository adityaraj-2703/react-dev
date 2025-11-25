# AWS and Microfrontend Architecture — Airbnb Events Page

## 1. AWS Services Used
In the Airbnb Events Page project, I used **AWS DynamoDB** integrated with **DynamoDB Streams** and **AWS Lambda** to synchronize data with **Amazon OpenSearch Service** in real time. The Events Page managed large-scale event metadata for monitoring and analytics. **DynamoDB** served as the primary datastore, while **Lambda** processed stream events and updated **OpenSearch** indexes for low-latency search. Additionally, **Amazon S3** stored archived logs and configuration files, and **CloudWatch** monitored Lambda performance, throughput, and ingestion latency.

---

## 2. Responsibilities of Each Service
- **DynamoDB** handled scalable event storage with high write throughput.  
- **Lambda** acted as an event processor, triggered automatically by DynamoDB Streams.  
- **OpenSearch** provided full-text indexing and search capabilities for real-time event dashboards.  
- **S3** stored static assets and event snapshots.  
- **CloudWatch** was used for logging, metrics, and alerting.

---

## 3. Rationale for Choosing These Services
This architecture provided **cost efficiency**, **automatic scalability**, and **low operational overhead**. DynamoDB scaled dynamically to handle fluctuating event loads, Lambda enabled serverless event processing, and OpenSearch allowed sub-second text and metadata queries—far more efficient than relational databases for real-time analytics. The combination reduced infrastructure maintenance while supporting consistent global performance.

---

## 4. Challenges and Solutions
One major challenge was **Lambda concurrency spikes** during peak event inflow, which caused throttling and delayed updates to OpenSearch. This was mitigated by implementing **Kinesis buffering**, batching writes, and using **reserved concurrency controls**. Another issue involved **OpenSearch index lag** during high-volume updates, solved through **batch tuning**, **backoff retries**, and optimized index refresh intervals.

---

## 5. AWS In-Depth Topics
- **IAM Roles & Policies:** Configured fine-grained roles ensuring least-privilege access between DynamoDB, Lambda, and OpenSearch.  
- **Event-Driven Architecture:** Used DynamoDB Streams to trigger Lambda for asynchronous event handling.  
- **Monitoring & Observability:** Leveraged CloudWatch Logs Insights for real-time metrics and latency monitoring.

---

## 6. Route-Based vs Component-Based Microfrontends
**Route-based microfrontends** load independent apps per route (e.g., `/events`, `/alerts`), providing clear isolation and simpler deployments.  
**Component-based microfrontends** render multiple smaller apps on the same route, allowing tighter integration but requiring shared runtime coordination.

---

## 7. Communication Between Microfrontends
Multiple microfrontends communicated via **shared state libraries** (Redux Toolkit) and a **lightweight global event bus** using browser `CustomEvent` APIs. This allowed data sharing without direct coupling between applications.

---

## 8. Monorepo Concept
A **monorepo** is a single repository containing multiple projects or packages, enabling unified builds, shared tooling, and consistent versioning across microfrontends and backend services.

---

## 9. Monorepo Toolchains
Common monorepo solutions include **Nx**, **Turborepo**, and **Bazel**, which offer dependency graph tracking, incremental builds, and parallelized CI/CD pipelines—improving scalability and maintainability for large distributed teams.

---
