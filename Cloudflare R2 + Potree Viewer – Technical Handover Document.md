# Cloudflare R2 + Potree Viewer – Technical Handover Document

## 1. Project Overview

**Purpose:**
This setup hosts a Potree-generated 3D point cloud viewer using **Cloudflare R2** for storage and **Cloudflare Workers** for HTTP delivery and iframe embedding.

**Key characteristics:**

* Static Potree website (HTML + JS + binary data)
* Large dataset optimized for streaming via HTTP Range requests
* Embedded as an iframe on a third-party website
* No server-side application backend

---

## 2. Architecture Summary

```
Browser
  └─ iframe
      └─ Cloudflare Worker (HTTP + headers + range support)
           └─ Cloudflare R2 bucket (private)
```

**Important notes:**

* R2 buckets are **not public**
* All access is mediated through the Worker
* No credentials are embedded in frontend code

---

## 3. Cloudflare Resources

### Cloudflare Account

* Owner: **Mariusz Burdajewicz**
* Developer access via Cloudflare user account: **khirbetessar@gmail.com**

---

### R2 Storage

* **Bucket names:** `khirbet-t1`, `khirbet-t5`
* **Purpose:** Stores Potree site files and point cloud data
* **Visibility:** Private
* **Upload method:** S3-compatible tools (e.g. rclone)

**Buckets structure:**

```
/
├── index.html
├── lib/
│   └── potree / three.js / dependencies
└── pointcloud/
    └── trench1/
        ├── metadata.json
        ├── hierarchy.bin
        ├── octree.bin
        └── ...
```
```
/
├── index.html
├── lib/
│   └── potree / three.js / dependencies
└── pointcloud/
    └── trench5/
        ├── metadata.json
        ├── hierarchy.bin
        ├── octree.bin
        └── ...
```

---

### Cloudflare Worker

* **Worker names:** `potree-trench1`, `potree-trench5`

* **Public URLs:**
  `https://potree-trench1.khirbetessar.workers.dev/`
  `https://potree-trench5.khirbetessar.workers.dev/`

* **Purpose:**

  * Serves static files from R2
  * Supports HTTP Range requests (required by Potree)
  * Sets headers to allow iframe embedding

* **R2 Binding:**

  * Variable for trench1 name: `BUCKET`
  * Bound to bucket: `khirbet-t1`
  * Variable for trench5 name: `BUCKET`
  * Bound to bucket: `khirbet-t5`

---

## 4. Security & Credentials Policy

### Credential Ownership

* All Cloudflare and R2 credentials are owned by **the site owner**
* Contractors should only use **temporary, scoped tokens**

### R2 API Tokens

**Required permissions:**

* Object Read
* Object Write
  (optional: List, for diagnostics)

**Scope:**

* All buckets

---

## 5. Uploading / Updating Content

### Recommended tool

* `rclone` (S3-compatible)

### Example upload command

```bash
rclone copy ./potree-site khirbet-t5:khirbet-t5 \
  --s3-no-check-bucket \
  --transfers 8 \
  --checkers 16
```

**Notes:**

* Buckets must be created via Cloudflare Dashboard
* Directory structure must remain unchanged
* Only changed files need to be re-uploaded

---

## 6. Verification Checklist

After any update:

1. Open the Worker URL directly in a browser
2. Confirm:

   * Viewer UI loads
   * Point cloud renders
3. In browser DevTools → Network:

   * `.bin` files return **206 Partial Content**
   * `metadata.json` returns **200**

---

## 7. iframe Integration

Example embed code:

```html
<iframe
  src="https://potree-trench1.khirbetessar.workers.dev/"
  width="100%"
  height="800">
</iframe>
```

No CORS configuration is required for basic embedding.

---

## 8. Maintenance & Future Changes

### Safe changes

* Replacing point cloud data (same structure)
* Updating Potree version
* Adding cache headers to Worker
* Attaching a custom domain

### Changes requiring care

* Renaming folders or files
* Modifying paths in `index.html`
* Disabling Range requests
* Making the bucket public

---

## 9. Decommissioning / Access Revocation

When a developer leaves the project:

1. Revoke their R2 API token
2. Review Cloudflare user access
3. (Optional) Rotate Worker bindings if policies change

---

## 10. Contact & Responsibility

**Current maintainer:**

* Name: Przemysław Kuczyński
* Role: Developer
* Contact: https://github.com/PanKuczy
