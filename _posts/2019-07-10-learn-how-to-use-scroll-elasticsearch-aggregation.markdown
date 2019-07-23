---
title: "Learn how to use scroll Elasticsearch aggregation"
layout: post
date: 2019-07-10 10:00
image: /assets/images/es-aggs.png
headerImage: false
tag: [elasticsearch, scroll, aggregations]
star: false
category: blog
author: arzzen
commentIssueId: 29
description: Learn how to use scroll Elasticsearch aggregation
---

#### Do you have too many results from aggregations in a single query?

If so, then you can read this quick tutorial, which might be helpful. 

Sometimes, there are too many unique terms processed in a single request/response pair, so it can be useful to break the analysis up into multiple requests. 

If you use Elasticsearch 5.3 and above versions, you can achieve the grouping of the field’s values into a number of partitions at query-time and process only one partition in each request. 

For instance, in the query below, you can request to your buckets into 20 partitions and only have returned the first partition. It returns ~10x less data than, if you try to retrieve all data at once.

```json
{
   "size": 0,
   "aggs": {
      "your_agg_name": {
         "terms": {
            "field": "your_field_name",
            "include": {
               "partition": 0,
               "num_partitions": 20
            },
            "size": 10000,
            "order": {
               "your_sort_field_name": "asc"
            }
         }
      }
   }
}
```

You can make the second request by increasing the `partition` to 1, until 19.
```json
{
   "size": 0,
   "aggs": {
      "your_agg_name": {
         "terms": {
            "field": "your_field_name",
            "include": {
               "partition": 1, 
               "num_partitions": 20
            },
            "size": 10000,
            "order": {
               "your_sort_field_name": "asc"
            }
         }
      }
   }
}
```

You need to run the query 20 times for each partition (one query per partition, from 0 to 19). 
The size setting of the number of returned results needs to be tuned with the num_partitions.

Example of the process for balancing values for `size` and `num_partitions` should be:

1, use the `cardinality` aggregation to estimate the total number of unique values,

2, pick a value for `num_partitions` to break the number from 1 up into more manageable chunks,

3, pick a `size` value for the number of responses you want from each partition,

4, run a test request.

> If you have a `circuit-breaker error`, you must increase `num_partitions`!

If your aggregation response is not complete, you must either:

- increase the `size` parameter to return more results per partition (could be heavy on memory) 
or
- increase the `num_partitions` to consider less accounts per request (could increase overall processing time, which you need to make more requests)

In my opinion, this is a balancing act between managing the Elasticsearch resources and the volume of requests.

