// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This is a point-in-time view of the quickstarts repo. To update the quickstartsRef & filePaths below,
// run the following in the https://github.com/Azure/azure-quickstart-templates repo after pulling the latest changes from master:
//   git rev-parse HEAD
//   git ls-files '/quickstarts/**/main.bicep'

const quickstartsRef = 'ac80b95f18276060d7a85e7d2b757784160357a3';

export const quickstartsPaths = [
  'microsoft.analysisservices/analysis-services-create/main.bicep',
  'microsoft.apimanagement/api-management-create-with-external-vnet-publicip/main.bicep',
  'microsoft.apimanagement/api-management-create-with-internal-vnet-publicip/main.bicep',
  'microsoft.apimanagement/api-management-create-with-msi/main.bicep',
  'microsoft.apimanagement/api-management-create-with-multiregion/main.bicep',
  'microsoft.apimanagement/api-management-key-vault-create/main.bicep',
  'microsoft.apimanagement/api-management-private-endpoint/main.bicep',
  'microsoft.apimanagement/api-management-simple-zones/main.bicep',
  'microsoft.apimanagement/azure-api-management-create/main.bicep',
  'microsoft.app/container-app-azurevote/main.bicep',
  'microsoft.app/container-app-create/main.bicep',
  'microsoft.appconfiguration/app-configuration-store-ff/main.bicep',
  'microsoft.appconfiguration/app-configuration-store-keyvaultref/main.bicep',
  'microsoft.appconfiguration/app-configuration-store-kv/main.bicep',
  'microsoft.appconfiguration/app-configuration-store/main.bicep',
  'microsoft.attestation/attestation-provider-create/main.bicep',
  'microsoft.authorization/rbac-builtinrole-resourcegroup/main.bicep',
  'microsoft.batch/batchaccount-with-storage/main.bicep',
  'microsoft.cache/redis-cache/main.bicep',
  'microsoft.cache/redis-premium-cluster-diagnostics/main.bicep',
  'microsoft.cache/redis-premium-persistence/main.bicep',
  'microsoft.cache/redis-premium-vnet/main.bicep',
  'microsoft.cdn/cdn-customize/main.bicep',
  'microsoft.cdn/cdn-with-custom-origin/main.bicep',
  'microsoft.cdn/cdn-with-ruleseengine-cacheoverride/main.bicep',
  'microsoft.cdn/cdn-with-ruleseengine-responseheader/main.bicep',
  'microsoft.cdn/cdn-with-ruleseengine-rewriteandredirect/main.bicep',
  'microsoft.cdn/cdn-with-ruleseengine-urlsigning/main.bicep',
  'microsoft.cdn/cdn-with-storage-account/main.bicep',
  'microsoft.cdn/cdn-with-web-app/main.bicep',
  'microsoft.cdn/front-door-premium-app-service-private-link/main.bicep',
  'microsoft.cdn/front-door-premium-function-private-link/main.bicep',
  'microsoft.cdn/front-door-premium-storage-blobs-private-link/main.bicep',
  'microsoft.cdn/front-door-premium-vm-private-link/main.bicep',
  'microsoft.cdn/front-door-premium-waf-managed/main.bicep',
  'microsoft.cdn/front-door-standard-premium-api-management-external/main.bicep',
  'microsoft.cdn/front-door-standard-premium-app-service-public/main.bicep',
  'microsoft.cdn/front-door-standard-premium-application-gateway-public/main.bicep',
  'microsoft.cdn/front-door-standard-premium-container-instances-application-gateway-public/main.bicep',
  'microsoft.cdn/front-door-standard-premium-container-instances-public/main.bicep',
  'microsoft.cdn/front-door-standard-premium-custom-domain-azure-dns/main.bicep',
  'microsoft.cdn/front-door-standard-premium-custom-domain-customer-certificate/main.bicep',
  'microsoft.cdn/front-door-standard-premium-custom-domain/main.bicep',
  'microsoft.cdn/front-door-standard-premium-function-public/main.bicep',
  'microsoft.cdn/front-door-standard-premium-geo-filtering/main.bicep',
  'microsoft.cdn/front-door-standard-premium-rate-limit/main.bicep',
  'microsoft.cdn/front-door-standard-premium-rule-set/main.bicep',
  'microsoft.cdn/front-door-standard-premium-storage-static-website/main.bicep',
  'microsoft.cdn/front-door-standard-premium-waf-custom/main.bicep',
  'microsoft.cdn/front-door-standard-premium/main.bicep',
  'microsoft.cognitiveservices/cognitive-services-universalkey/main.bicep',
  'microsoft.compute/1vm-2nics-2subnets-1vnet/main.bicep',
  'microsoft.compute/2-vms-internal-load-balancer/main.bicep',
  'microsoft.compute/vm-copy-managed-disks/main.bicep',
  'microsoft.compute/vm-domain-join/main.bicep',
  'microsoft.compute/vm-simple-linux/main.bicep',
  'microsoft.compute/vm-simple-windows/main.bicep',
  'microsoft.compute/vm-trustedlaunch-linux/main.bicep',
  'microsoft.compute/vm-trustedlaunch-windows/main.bicep',
  'microsoft.compute/vm-windows-admincenter/main.bicep',
  'microsoft.compute/vm-windows-baseline/main.bicep',
  'microsoft.compute/vm-windows-ssh/main.bicep',
  'microsoft.compute/vm-with-standardssd-disk/main.bicep',
  'microsoft.compute/vmss-flexible-orchestration-quickstart/main.bicep',
  'microsoft.compute/vmss-windows-autoscale/main.bicep',
  'microsoft.compute/vmss-with-public-ip-prefix/main.bicep',
  'microsoft.consumption/create-budget-onefilter/main.bicep',
  'microsoft.consumption/create-budget-simple/main.bicep',
  'microsoft.consumption/create-budget/main.bicep',
  'microsoft.containerinstance/aci-linuxcontainer-public-ip/main.bicep',
  'microsoft.containerinstance/aci-linuxcontainer-volume-secret/main.bicep',
  'microsoft.containerinstance/aci-sftp-files/main.bicep',
  'microsoft.containerinstance/aci-vnet/main.bicep',
  'microsoft.containerregistry/container-registry-geo-replication/main.bicep',
  'microsoft.containerregistry/container-registry-with-policies-and-diagnostics/main.bicep',
  'microsoft.containerregistry/container-registry/main.bicep',
  'microsoft.databricks/databricks-all-in-one-template-for-vnet-injection/main.bicep',
  'microsoft.databricks/databricks-workspace/main.bicep',
  'microsoft.datafactory/data-factory-v2-blob-to-blob-copy/main.bicep',
  'microsoft.datafactory/data-factory-v2-create/main.bicep',
  'microsoft.datafactory/data-factory-v2-git-config-managed-vnet/main.bicep',
  'microsoft.datalakestore/data-lake-store-encryption-adls/main.bicep',
  'microsoft.datamigration/azure-database-migration-simple-deploy/main.bicep',
  'microsoft.dataprotection/backup-create-disk-enable-protection/main.bicep',
  'microsoft.dataprotection/backup-create-storage-account-enable-protection/main.bicep',
  'microsoft.dataprotection/backup-vault-basic/main.bicep',
  'microsoft.datashare/data-share-account/main.bicep',
  'microsoft.datashare/data-share-share-storage-account/main.bicep',
  'microsoft.datashare/data-share-share/main.bicep',
  'microsoft.dbformariadb/managed-mariadb-with-vnet/main.bicep',
  'microsoft.dbformysql/flexible-mysql-with-vnet/main.bicep',
  'microsoft.dbformysql/managed-mysql-with-vnet/main.bicep',
  'microsoft.dbforpostgresql/managed-postgresql-with-vnet/main.bicep',
  'microsoft.devices/iothub-auto-route-messages/main.bicep',
  'microsoft.deviceupdate/deviceupdate-create-account-instance-iothub/main.bicep',
  'microsoft.deviceupdate/deviceupdate-create-account/main.bicep',
  'microsoft.devtestlab/dtl-create-lab-windows-vm-claimed/main.bicep',
  'microsoft.digitaltwins/digitaltwins-with-function-private-link/main.bicep',
  'microsoft.documentdb/cosmosdb-cassandra-autoscale/main.bicep',
  'microsoft.documentdb/cosmosdb-cassandra/main.bicep',
  'microsoft.documentdb/cosmosdb-create-multi-region-account/main.bicep',
  'microsoft.documentdb/cosmosdb-free/main.bicep',
  'microsoft.documentdb/cosmosdb-gremlin-autoscale/main.bicep',
  'microsoft.documentdb/cosmosdb-gremlin/main.bicep',
  'microsoft.documentdb/cosmosdb-mongodb-autoscale/main.bicep',
  'microsoft.documentdb/cosmosdb-mongodb/main.bicep',
  'microsoft.documentdb/cosmosdb-private-endpoint/main.bicep',
  'microsoft.documentdb/cosmosdb-sql-analytical-store/main.bicep',
  'microsoft.documentdb/cosmosdb-sql-autoscale/main.bicep',
  'microsoft.documentdb/cosmosdb-sql-container-sprocs/main.bicep',
  'microsoft.documentdb/cosmosdb-sql-minimal/main.bicep',
  'microsoft.documentdb/cosmosdb-sql-rbac/main.bicep',
  'microsoft.documentdb/cosmosdb-sql/main.bicep',
  'microsoft.documentdb/cosmosdb-table-autoscale/main.bicep',
  'microsoft.documentdb/cosmosdb-table/main.bicep',
  'microsoft.documentdb/cosmosdb-webapp/main.bicep',
  'microsoft.documentdb/microsoft-defender-cosmosdb-create-account/main.bicep',
  'microsoft.eventgrid/event-grid-servicebus-queue/main.bicep',
  'microsoft.eventgrid/event-grid-subscription-and-storage/main.bicep',
  'microsoft.eventgrid/event-grid/main.bicep',
  'microsoft.eventhub/eventhubs-create-cluster-namespace-eventhub/main.bicep',
  'microsoft.eventhub/eventhubs-create-cluster-namespace/main.bicep',
  'microsoft.eventhub/eventhubs-create-namespace-and-eventhub/main.bicep',
  'microsoft.hdinsight/hdinsight-hbase-linux/main.bicep',
  'microsoft.hdinsight/hdinsight-interactive-hive/main.bicep',
  'microsoft.hdinsight/hdinsight-kafka/main.bicep',
  'microsoft.hdinsight/hdinsight-linux-ssh-password/main.bicep',
  'microsoft.hdinsight/hdinsight-spark-linux/main.bicep',
  'microsoft.healthcareapis/azure-api-for-fhir/main.bicep',
  'microsoft.insights/insights-alertrules-application-insights/main.bicep',
  'microsoft.insights/insights-alertrules-servicehealth/main.bicep',
  'microsoft.insights/log-analytics-with-datasources-solutions/main.bicep',
  'microsoft.insights/log-analytics-with-solutions-and-diagnostics/main.bicep',
  'microsoft.keyvault/key-vault-create-rbac/main.bicep',
  'microsoft.keyvault/key-vault-create/main.bicep',
  'microsoft.keyvault/key-vault-managed-identity-role-assignment/main.bicep',
  'microsoft.keyvault/key-vault-secret-create/main.bicep',
  'microsoft.keyvault/key-vault-with-logging-create/main.bicep',
  'microsoft.keyvault/managed-hsm-create/main.bicep',
  'microsoft.kubernetes/aks-helm/main.bicep',
  'microsoft.kubernetes/aks-vmss-systemassigned-identity/main.bicep',
  'microsoft.kubernetes/aks/main.bicep',
  'microsoft.kusto/kusto-event-hub/main.bicep',
  'microsoft.labservices/lab-plan/main.bicep',
  'microsoft.labservices/lab-using-lab-plan/main.bicep',
  'microsoft.labservices/lab/main.bicep',
  'microsoft.logic/logic-app-create/main.bicep',
  'microsoft.machinelearningservices/machine-learning-end-to-end-secure-v1-legacy-mode/main.bicep',
  'microsoft.machinelearningservices/machine-learning-end-to-end-secure/main.bicep',
  'microsoft.maps/maps-indoormaps/main.bicep',
  'microsoft.media/media-services-create/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-create-dashboard/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-create-full-5gc-deployment/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-create-mobile-network/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-create-new-site/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-create-sim-policy/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-provision-proxy-sims/main.bicep',
  'microsoft.mobilenetwork/mobilenetwork-update-packet-core-control-plane/main.bicep',
  'microsoft.network/aad-domainservices/main.bicep',
  'microsoft.network/application-gateway-v2-autoscale-create/main.bicep',
  'microsoft.network/application-gateway-waf-firewall-policy/main.bicep',
  'microsoft.network/azure-bastion/main.bicep',
  'microsoft.network/azure-dns-new-zone/main.bicep',
  'microsoft.network/azurefirewall-create-with-firewallpolicy-apprule-netrule-ipgroups/main.bicep',
  'microsoft.network/azurefirewall-with-zones-sandbox/main.bicep',
  'microsoft.network/create-and-enable-ddos-protection-plans/main.bicep',
  'microsoft.network/existing-vnet-to-vnet-peering/main.bicep',
  'microsoft.network/expressroute-circuit-create/main.bicep',
  'microsoft.network/expressroute-private-peering-vnet/main.bicep',
  'microsoft.network/front-door-create-basic/main.bicep',
  'microsoft.network/front-door-create-redirect/main.bicep',
  'microsoft.network/front-door-custom-domain-customer-certificate/main.bicep',
  'microsoft.network/front-door-custom-domain/main.bicep',
  'microsoft.network/front-door-health-probes/main.bicep',
  'microsoft.network/front-door-managed-waf-ruleset/main.bicep',
  'microsoft.network/fw-docs-qs/main.bicep',
  'microsoft.network/fwm-docs-qs/main.bicep',
  'microsoft.network/internal-loadbalancer-create/main.bicep',
  'microsoft.network/nat-gateway-1-vm/main.bicep',
  'microsoft.network/nat-gateway-vnet/main.bicep',
  'microsoft.network/networkwatcher-create/main.bicep',
  'microsoft.network/networkwatcher-flowLogs-create/main.bicep',
  'microsoft.network/nsg-create-with-diagnostic-logs/main.bicep',
  'microsoft.network/nsg-flow-logs-with-traffic-analytics/main.bicep',
  'microsoft.network/point-to-site-aad/main.bicep',
  'microsoft.network/private-dns-zone/main.bicep',
  'microsoft.network/privatelink-service/main.bicep',
  'microsoft.network/route-server/main.bicep',
  'microsoft.network/route-table-create/main.bicep',
  'microsoft.network/subnet-add-vnet-existing/main.bicep',
  'microsoft.network/traffic-manager-external-endpoint/main.bicep',
  'microsoft.network/traffic-manager-vm/main.bicep',
  'microsoft.network/traffic-manager-webapp/main.bicep',
  'microsoft.network/virtual-wan/main.bicep',
  'microsoft.network/vnet-create-with-diagnostic-logs/main.bicep',
  'microsoft.network/vnet-to-vnet-bgp/main.bicep',
  'microsoft.network/vnet-to-vnet-peering/main.bicep',
  'microsoft.network/vnet-two-subnets/main.bicep',
  'microsoft.notificationhubs/notification-hub/main.bicep',
  'microsoft.operationsmanagement/azure-sentinel/main.bicep',
  'microsoft.recoveryservices/recovery-services-backup-classic-resource-manager-vms/main.bicep',
  'microsoft.recoveryservices/recovery-services-backup-file-share/main.bicep',
  'microsoft.recoveryservices/recovery-services-backup-vms/main.bicep',
  'microsoft.recoveryservices/recovery-services-create-alert-processing-rule/main.bicep',
  'microsoft.recoveryservices/recovery-services-create-vault-enable-diagnostics/main.bicep',
  'microsoft.recoveryservices/recovery-services-create-vault-with-backup-policies/main.bicep',
  'microsoft.recoveryservices/recovery-services-create-vm-and-configure-backup/main.bicep',
  'microsoft.recoveryservices/recovery-services-daily-backup-policy-create/main.bicep',
  'microsoft.recoveryservices/recovery-services-vault-basic/main.bicep',
  'microsoft.recoveryservices/recovery-services-vault-create/main.bicep',
  'microsoft.recoveryservices/recovery-services-vm-workload-backup/main.bicep',
  'microsoft.recoveryservices/recovery-services-weekly-backup-policy-create/main.bicep',
  'microsoft.resources/deployment-script-azcli-acr-import/main.bicep',
  'microsoft.resources/deployment-script-azcli-agw-certificates/main.bicep',
  'microsoft.search/azure-search-create/main.bicep',
  'microsoft.security/securitycenter-create-automation-for-alertnamecontains/main.bicep',
  'microsoft.servicebus/servicebus-create-queue/main.bicep',
  'microsoft.servicebus/servicebus-namespace-vnet/main.bicep',
  'microsoft.servicefabric/service-fabric-secure-cluster-5-node-1-nodetype/main.bicep',
  'microsoft.signalrservice/signalr/main.bicep',
  'microsoft.sql/private-endpoint-sql/main.bicep',
  'microsoft.sql/sql-auditing-server-policy-to-oms/main.bicep',
  'microsoft.sql/sql-data-warehouse-transparent-encryption-create/main.bicep',
  'microsoft.sql/sql-database/main.bicep',
  'microsoft.sql/sqlmi-new-vnet/main.bicep',
  'microsoft.sqlvirtualmachine/sql-vm-new-storage/main.bicep',
  'microsoft.storage/storage-account-create/main.bicep',
  'microsoft.storage/storage-account-service-encryption-create/main.bicep',
  'microsoft.storage/storage-advanced-threat-protection-create/main.bicep',
  'microsoft.storage/storage-blob-container/main.bicep',
  'microsoft.storage/storage-blob-encryption-and-retention/main.bicep',
  'microsoft.storage/storage-blob-encryption-with-cmk/main.bicep',
  'microsoft.storage/storage-file-share/main.bicep',
  'microsoft.storage/storage-multi-blob-container/main.bicep',
  'microsoft.storage/storage-multi-file-share/main.bicep',
  'microsoft.storage/storage-sftp/main.bicep',
  'microsoft.storage/storage-static-website/main.bicep',
  'microsoft.storagepool/diskpool-create-entry-level/main.bicep',
  'microsoft.streamanalytics/streamanalytics-create/main.bicep',
  'microsoft.web/app-service-docs-linux/main.bicep',
  'microsoft.web/app-service-regional-vnet-integration/main.bicep',
  'microsoft.web/asev2-ilb-with-web-app/main.bicep',
  'microsoft.web/azure-web-pubsub/main.bicep',
  'microsoft.web/documentdb-webapp/main.bicep',
  'microsoft.web/function-app-create-dynamic/main.bicep',
  'microsoft.web/function-app-storage-private-endpoints/main.bicep',
  'microsoft.web/function-http-trigger/main.bicep',
  'microsoft.web/function-premium-vnet-integration/main.bicep',
  'microsoft.web/private-webapp-with-app-gateway-and-apim/main.bicep',
  'microsoft.web/web-app-asev2-create/main.bicep',
  'microsoft.web/web-app-asp-app-on-asev3-create/main.bicep',
  'microsoft.web/web-app-loganalytics/main.bicep',
  'microsoft.web/web-app-managed-identity-sql-db/main.bicep',
  'microsoft.web/web-app-sql-database/main.bicep',
  'microsoft.web/web-app-with-redis-cache/main.bicep',
  'microsoft.web/webapp-basic-windows/main.bicep',
  'microsoft.web/webapp-linux-managed-mysql/main.bicep',
  'microsoft.web/webapp-linux-sonarqube-postgresql-private-vnet/main.bicep',
  'microsoft.web/webapp-managed-mysql/main.bicep',
  'microsoft.web/webapp-privateendpoint-vnet-injection/main.bicep',
];

export function getQuickstartsLink(filePath: string) {
  return `https://raw.githubusercontent.com/Azure/azure-quickstart-templates/${quickstartsRef}/quickstarts/${filePath}`;
}