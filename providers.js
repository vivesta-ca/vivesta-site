<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">const axios = require('axios');</p>
<p class="p2"><br></p>
<p class="p1">exports.handler = async function(event, context) {</p>
<p class="p1"><span class="Apple-converted-space">  </span>try {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const response = await axios.get(url, {</p>
<p class="p1"><span class="Apple-converted-space">      </span>headers: {</p>
<p class="p1"><span class="Apple-converted-space">        </span>Authorization: `Bearer ${AIRTABLE_API_TOKEN}`</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const providers = response.data.records.map(r =&gt; r.fields);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>return {</p>
<p class="p1"><span class="Apple-converted-space">      </span>statusCode: 200,</p>
<p class="p1"><span class="Apple-converted-space">      </span>headers: {</p>
<p class="p1"><span class="Apple-converted-space">        </span>'Content-Type': 'application/json',</p>
<p class="p1"><span class="Apple-converted-space">        </span>'Access-Control-Allow-Origin': '*'</p>
<p class="p1"><span class="Apple-converted-space">      </span>},</p>
<p class="p1"><span class="Apple-converted-space">      </span>body: JSON.stringify(providers)</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">  </span>} catch (err) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>console.error(err);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return {</p>
<p class="p1"><span class="Apple-converted-space">      </span>statusCode: 500,</p>
<p class="p1"><span class="Apple-converted-space">      </span>body: JSON.stringify({ error: 'Failed to load providers' })</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">};</p>
</body>
</html>
