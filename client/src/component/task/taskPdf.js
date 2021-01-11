import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      marginHorizontal:30,
      marginVertical:50
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  

export const TaskPdf = (props) => {
    const {task} = props
    
    return (
        <PDFDownloadLink
        document={<Document>
          <Page size="A4" style={styles.page}>
            <View style={{width:'100%', marginVertical:20}}>
              <Text>Task list</Text>
            </View>
          
            {task.map((val, i) => 
                <View style={{width:'100%'}}>
                  <Text>
                      {i+1}) {val.task}
                  </Text>
                </View>
            )}
          </Page>
      </Document>}
        fileName="task.pdf">
            {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : <div style={{color:'black'}}>Download Task in Pdf</div>
        }
        </PDFDownloadLink>
        

    )
}
