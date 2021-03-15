<?php

$db = new PDO("sqlite:fossil.db");

$sql = "SELECT * FROM locations";

$rs = $db->query($sql);

if (!$rs) {
	echo "Site data could not be retrieved.\n";

	exit;
}

$rows = array();

while ($r = $rs->fetch(PDO::FETCH_ASSOC)) {
	$rows[] = $r;
}

print json_encode($rows);

$db = NULL;
